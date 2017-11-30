import React from 'react';
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import xor from 'lodash/xor';

const contains = {
    include_all: (a_set, b_set) => difference(Array.from(a_set), Array.from(b_set)).length === 0,
    include_any: (a_set, b_set) => new Set([...a_set].filter(x => b_set.has(x))).size > 0,
    except_all: (a_set, b_set) => new Set([...a_set].filter(x => !b_set.has(x))).size > 0,
    except_any: (a_set, b_set) => difference(Array.from(a_set), Array.from(b_set)).length > 1,
    same: (a_set, b_set) => xor(Array.from(a_set), Array.from(b_set)).length === 0,
};

export class ChildrenFilter extends React.Component {
    constructor(props) {
        super(props);
        const { type } = this.props;
        if(!contains.hasOwnProperty(type)){
            throw new Error(`ChildrenFilter Type[${type}] is not exist`)
        }
    }
    render() {
        const { type } = this.props;
        const { filter, filter_key } = this.props;
        const filter_set = new Set(filter);
        const filteredChildren = React.Children.map(this.props.children, child => {
            if(child === null || typeof child === 'string' || !child.props instanceof Object || child.props[filter_key] === undefined){
                console.warn("If you see this message, make sure you have specified filter_key props on the child component. Otherwise, make sure you have children returning null or undefined or just string.\n");
                return child;
            }
            const child_filter_set = new Set(child.props[filter_key]);
            const is_contain = contains[type](filter_set, child_filter_set);
            return is_contain && React.cloneElement(child,{});
        })
        return (
            <div>
                {filteredChildren}
            </div>
        );
    }
}


ChildrenFilter.propTypes= {
    filter: PropTypes.array.isRequired,
    filter_key: PropTypes.string,
    type: PropTypes.string // include_all, include_any, except_all, except_any, same
};

ChildrenFilter.defaultProps = {
    filter_key: 'filter',
    type: 'include_any',
};

