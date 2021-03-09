// const now = Date.now();
const future = Date.now() + 60*1000;

let i = false;

while (i == false) {
    let now = Date.now();
    console.log(now);
    if (future < now) {i = true}
}