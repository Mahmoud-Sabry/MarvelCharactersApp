
export function convertToHttps(url: string): string {
    if (url.startsWith('http://')) {
        return 'https://' + url.slice(7);
    }
    return url;
}