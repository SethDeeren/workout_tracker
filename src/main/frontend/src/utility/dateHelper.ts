export function isToday(someDate: Date) {
    const today = new Date();
    return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
}

export function areEqualDates(someDate: Date, anotherDate: Date) {
    return someDate.getDate() == anotherDate.getDate() &&
        someDate.getMonth() == anotherDate.getMonth() &&
        someDate.getFullYear() == anotherDate.getFullYear()
}
