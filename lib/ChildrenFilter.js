(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'lodash/difference', 'lodash/xor'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('lodash/difference'), require('lodash/xor'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.difference, global.xor);
        global.ChildrenFilter = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _difference, _xor) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ChildrenFilter = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _difference2 = _interopRequireDefault(_difference);

    var _xor2 = _interopRequireDefault(_xor);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    var contains = {
        include_all: function include_all(a_set, b_set) {
            return (0, _difference2.default)(Array.from(a_set), Array.from(b_set)).length === 0;
        },
        include_any: function include_any(a_set, b_set) {
            return new Set([].concat(_toConsumableArray(a_set)).filter(function (x) {
                return b_set.has(x);
            })).size > 0;
        },
        except_all: function except_all(a_set, b_set) {
            return new Set([].concat(_toConsumableArray(a_set)).filter(function (x) {
                return !b_set.has(x);
            })).size > 0;
        },
        except_any: function except_any(a_set, b_set) {
            return (0, _difference2.default)(Array.from(a_set), Array.from(b_set)).length > 1;
        },
        same: function same(a_set, b_set) {
            return (0, _xor2.default)(Array.from(a_set), Array.from(b_set)).length === 0;
        }
    };

    var ChildrenFilter = exports.ChildrenFilter = function (_React$Component) {
        _inherits(ChildrenFilter, _React$Component);

        function ChildrenFilter(props) {
            _classCallCheck(this, ChildrenFilter);

            var _this = _possibleConstructorReturn(this, (ChildrenFilter.__proto__ || Object.getPrototypeOf(ChildrenFilter)).call(this, props));

            var type = _this.props.type;

            if (!contains.hasOwnProperty(type)) {
                throw new Error('ChildrenFilter Type[' + type + '] is not exist');
            }
            return _this;
        }

        _createClass(ChildrenFilter, [{
            key: 'render',
            value: function render() {
                var type = this.props.type;
                var _props = this.props,
                    filter = _props.filter,
                    filter_key = _props.filter_key;

                var filter_set = new Set(filter);
                var filteredChildren = _react2.default.Children.map(this.props.children, function (child) {
                    var child_filter_set = new Set(child.props[filter_key]);
                    var is_contain = contains[type](filter_set, child_filter_set);
                    return is_contain && _react2.default.cloneElement(child, {});
                });
                return _react2.default.createElement(
                    'div',
                    null,
                    filteredChildren
                );
            }
        }]);

        return ChildrenFilter;
    }(_react2.default.Component);

    ChildrenFilter.PropTypes = {
        filter: _propTypes2.default.array.isRequired,
        filter_key: _propTypes2.default.array,
        type: _propTypes2.default.string // include_all, include_any, except_all, except_any, same
    };

    ChildrenFilter.defaultProps = {
        filter_key: 'filter',
        type: 'any'
    };
});