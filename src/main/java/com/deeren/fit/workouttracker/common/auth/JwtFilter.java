package com.deeren.fit.workouttracker.common.auth;

import com.deeren.fit.workouttracker.common.service.AuthService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {


    private JWTUtility jwtUtility;
    private AuthService authService;



    public JwtFilter(AuthService authService, JWTUtility jwtUtility){
        this.authService = authService;
        this.jwtUtility = jwtUtility;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String authorization = httpServletRequest.getHeader("Authorization");
        System.out.println("authorization is " + authorization);
        String token = null;
        String userName = null;

        System.out.println("==================>>>>>>>>>>>>> internal filter");

        if(null != authorization && authorization.startsWith("Bearer ")){
            System.out.println("========================>>>>>>>>>>>>>>> if one");
            token = authorization.substring(7);
            userName = jwtUtility.getUsernameFromToken(token);
        }

        if(null != userName && SecurityContextHolder.getContext().getAuthentication() == null){

            System.out.println("========================>>>>>>>>>>>>>>> if two");

            UserDetails userDetails =
                    authService.loadUserByUsername(userName);
            if(jwtUtility.validateToken(token, userDetails)){
                System.out.println("==================>>>>>>>>>>> if three");
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                        = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                usernamePasswordAuthenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(httpServletRequest)
                );


                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }

        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
