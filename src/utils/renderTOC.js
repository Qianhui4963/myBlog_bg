import marked from "marked";
let toc = []
let maxTitle = 1;
let lastToc = null;
const renderer = {
    heading(text, level, raw) {
        if (!lastToc) {
            let _toc = createToc(text, text, lastToc, level)
            lastToc = _toc;
            toc.push(_toc)
            maxTitle = level;
            return `<h${level} id='${text}'>${text}</h${level}>`;
        }
        if (level > maxTitle) {
            let _toc = createToc(text, text, lastToc, level)
            lastToc.childern.push(_toc)
            maxTitle = level
            lastToc = _toc
        } else if (level == maxTitle) {
            let _toc = createToc(text, text, lastToc.parent, level)
            lastToc.parent.childern.push(_toc)
        } else if (level < maxTitle) {
            if (level == lastToc.parent.level) {
                let _toc = createToc(text, text, lastToc.parent?.parent, level)
                lastToc.parent?.parent.childern.push(_toc)
                maxTitle = level
                lastToc = _toc
            }
        }
        return `<h${level} id='${text}'>${text}</h${level}>`;
    }
};
function createToc(anchor, name, parent, level) {
    let _toc = {
        level,
        anchor,
        name,
        parent,
        childern: []
    }
    return _toc;
}

marked.use({ renderer })

function mapTOC(arr) {
    let _toc = []
    arr.forEach((item) => {
        _toc.push({ anchor: item.anchor, name: item.name, childern: mapTOC(item.childern) })
    })
    return _toc
}


export default function (md) {
    let html = marked.parse(md)
    return {
        html,
        toc: mapTOC(toc)
    }
}