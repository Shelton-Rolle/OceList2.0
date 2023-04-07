export default function GetCurrentDate() {
    const today = new Date();
    let date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    let month =
        today.getMonth() + 1 < 10
            ? `0${today.getMonth() + 1}`
            : today.getMonth() + 1;
    let year = today.getFullYear();

    return `${date}/${month}/${year}`;
}
