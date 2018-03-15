function serialize(param = {}) {
    let string = '';
    for (let name in param) {
        if (!string) {
            let str = name + '=' + param[name];
            string += str
        }
        else {
            let str = '&' + name + '=' + param[name];
            string += str
        }
    }
    return string
}
function lajaxGet(url) {
    if (url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                }
            }
            xhr.send();
        })
    }
    else {
        throw new Error('url is is required');
    }
}
function lajaxPost(url, obj = {}) {
    if (url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('post', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    }
                }
            }
            xhr.send(serialize(obj));
        })
    }
    else {
        throw new Error('url is must be stand');
    }
}

const ajax = {
    get: lajaxGet,
    post: lajaxPost
}

export default ajax