import marked from "marked";
let toc = []
let maxLevel = 1;
let lastToc = null;

/**
 * 根据toc找到它父级
 * @param {*} toc 
 * @param {*} level 
 * @returns 
 */
function findParentToc(toc, level) {
    if (toc.parent === null) {
        return null
    }
    if (toc.level == level) {
        return toc.parent
    } else {
        return findParentToc(toc.parent, level)
    }
}
const renderer = {
    heading(text, level) {
        if (!lastToc) {
            let _toc = createToc(text, text, null, level)
            lastToc = _toc;
            toc.push(_toc)
            maxLevel = level;
            return `<h${level} id='${text}'>${text}</h${level}>`;
        }
        if (level > maxLevel) {
            let _toc = createToc(text, text, lastToc, level)
            lastToc.childern.push(_toc)
            maxLevel = level
            lastToc = _toc
        } else if (level == maxLevel) {
            if (findParentToc(lastToc, level) === null) {
                let _toc = createToc(text, text, null, level)
                lastToc = _toc;
                toc.push(_toc)
            } else {
                let _toc = createToc(text, text, lastToc.parent, level)
                lastToc.parent.childern.push(_toc)
            }
        } else if (level < maxLevel) {
            let parentToc = findParentToc(lastToc, level)
            let _toc = createToc(text, text, parentToc, level)
            parentToc ? parentToc.childern.push(_toc) : toc.push(_toc)
            maxLevel = level
            lastToc = _toc
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

// 过滤toc字段
function filterTOC(arr) {
    return arr.map(item => {
        return {
            anchor: item.anchor,
            name: item.name,
            childern: filterTOC(item.childern)
        }
    })
}

export default function (md) {
    let html = marked.parse(md)
    return {
        html,
        toc: filterTOC(toc)
    }
}