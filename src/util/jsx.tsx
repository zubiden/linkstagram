
export const insertNewlines = (text: string): (string | JSX.Element)[] => {
    const arr = text.split("\n").map((e, i) => [e, <br key={i}/>]).flat(1);
    arr.pop(); // remove last br
    return arr;
}