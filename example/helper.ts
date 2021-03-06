export function empty(n) {
    let str = '';

    for (let i = 0; i < n; i++) {
        str += '---';
    }

    return str;
}

export function printTree(tree) {
    console.log('start visit');

    function _visit(node, depth) {
        let info = `${empty(depth)} ${node.constructor.name}`;
        if (node.constructor.name !== 'TerminalNodeImpl') {
            info += ` ${node.start.start} ${node.stop.stop}`;
        } else {
            info += ` ${node.symbol.start} ${node.symbol.stop} ${node.getText()}`;
        }
        console.log(info);

        if (node.children) {
            node.children.forEach(function(_node) {
                // if (_node.constructor.name === 'TerminalNodeImpl') return;
                _visit(_node, depth + 1);
            });
        }
    }

    _visit(tree, 0);

    console.log('end visit');
}

export function generateTreeData(tree) {
    const rootNode = {
        name: 'root',
        children: []
    };

    function _visit(node, children) {
        if (node.children) {
            node.children.forEach(function(_node) {
                if (_node.constructor.name === 'TerminalNodeImpl') return;

                const node = {
                    name: _node.constructor.name,
                    children: []
                };

                _visit(_node, node.children);

                children.push(node);
            });
        }
    }

    _visit(tree, rootNode.children);

    return rootNode;
}

export function splitStr(text) {
    const result = [];

    for (let i = 0, len = text.length; i < len; i++) {
        let key = text[i];

        if (key === '\n') {
            key = '\\n';
        }

        result.push(key);

    }

    return result;
}
