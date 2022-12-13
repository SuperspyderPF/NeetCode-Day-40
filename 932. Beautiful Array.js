const beautifulArray = (n) => {
    let res = [1];
    while (res.length < n) {
        let tmp = [];
        for (const x of res) {
            if (x * 2 - 1 <= n) tmp.push(x * 2 - 1);
        }
        for (const x of res) {
            if (x * 2 <= n) tmp.push(x * 2);
        }
        res = tmp;
    }
    return res;
};