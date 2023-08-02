package com.deeren.fit.workouttracker.common.auth;

import com.deeren.fit.workouttracker.common.service.AuthService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {


    private AuthService authService;
    private JwtFilter jwtFilter;

    SecurityConfiguration(JwtFilter jwtFilter, AuthService authService){
        this.jwtFilter = jwtFilter;
        this.authService = authService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth ) throws Exception {
        auth.userDetailsService(authService);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {




        http.cors().configurationSource(new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest httpServletRequest) {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                config.setAllowedMethods(Collections.singletonList("*")); // refers to http methods post, get, etc..
                config.setAllowCredentials(true); // needed for login, register functionality
                config.setAllowedHeaders(Collections.singletonList("*")); // all headers must be allowed
                config.setMaxAge(3600L); // cache configuration every 3600 seconds to see if they are still valid
                return config;
            }
        }).and().csrf()
                .disable() // can be disabled b/c jwt already provides csrf protection
                .authorizeRequests()
                .antMatchers("/api/authenticate").permitAll()
                .antMatchers("/**").permitAll()
                .antMatchers("/js/**").permitAll()
                .antMatchers("/api/register").permitAll()
                .antMatchers(HttpMethod.GET, "/api/workouts/*").permitAll()
                .antMatchers(HttpMethod.GET, "/api/workouts").permitAll()
                .anyRequest()
                .authenticated()
               // This stops spring security from creating a JSESSION token b/c
                // instead we will take care of this through the use of jwt token
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);


        // Adds our customer jwt filter before UsernamePasswordAuthenticationFilter class
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }

}
