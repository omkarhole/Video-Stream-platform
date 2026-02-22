export const DateFormat = (date: string) => {
    const iso = date

    const formatted = new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata"
    }).format(new Date(iso));

    return formatted;
}