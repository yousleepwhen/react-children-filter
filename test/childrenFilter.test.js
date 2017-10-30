import React from 'react';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


import { JSDOM } from 'jsdom';
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

global.window = window;
global.document = window.document;

import { ChildrenFilter } from '../src/ChildrenFilter';

describe("children filter test", function(){
    context("single children", () => {
        it('should render', () => {
            const wrapper = mount(
                <ChildrenFilter type='include_any' filter_key='status' filter={['status_a', 'status_b']}>
                    <div status={['status_a']}>will?</div>
                </ChildrenFilter>
            );

            expect(wrapper.containsMatchingElement(<div status={['status_a']}>will?</div>)).to.equal(true);
        })
    })

    context("with ternary operator", () => {
        it('should render else statement', () => {
            const state = false;
            const wrapper = mount(
                <ChildrenFilter type='include_any' filter_key='status' filter={['status_a', 'status_b']}>
                    { state ? <div status={['status_a']}>will?</div> :
                       <div>haha</div>
                    }
                </ChildrenFilter>
            );

            expect(wrapper.containsMatchingElement(<div>haha</div>)).to.equal(true);
        })
    })
    context("type=[not exist] test", () => {
        it("should throw error [ChildrenFilter Type[throw_err] is not exist]", () => {
            expect(() => {
                mount(
                    <ChildrenFilter type='throw_err' filter_key='status' filter={['status_a', 'status_b']}>
                        <div>
                            will not render
                        </div>
                    </ChildrenFilter>
                );
            }).to.throw(`ChildrenFilter Type[throw_err] is not exist`)
        })
    });
    context("type='same'", () => {
        it("should render the child element of the same array", () => {
            const wrapper = mount(
                <ChildrenFilter type='same' filter_key='status' filter={['status_a', 'status_b']}>
                    <div status={['status_a']}>
                        Status A
                    </div>
                    <div status={['status_b']}>
                        Status B
                    </div>
                    <div status={['status_c', 'status_d']}>
                        Status C & D
                    </div>
                    <div status={['status_a', 'status_b']}>
                        Status A & B
                    </div>
                    <div status={['status_a', 'status_b', 'status_c', 'status_d']}>
                        Status A & B & C & D
                    </div>
                </ChildrenFilter>
            );
            expect(wrapper.containsMatchingElement(<div status={['status_c','status_d']}>Status C & D</div>)).to.equal(false);
            expect(wrapper.containsMatchingElement(<div status={['status_a','status_b']}>Status A & B</div>)).to.equal(true);
            expect(wrapper.containsMatchingElement(<div status={['status_a']}>Status A</div>)).to.equal(false);
            expect(wrapper.containsMatchingElement(<div status={['status_b']}>Status B</div>)).to.equal(false);
            expect(wrapper.containsMatchingElement(<div status={['status_a', 'status_b', 'status_c','status_d']}>Status A & B & C & D</div>)).to.equal(false);
        })
    })
    context("type='include_any'", () => {
        it("should render if any of the elements in the array are included.", () => {
            const wrapper = mount(
                <ChildrenFilter type='include_any' filter_key='status' filter={['status_a', 'status_b']}>
                    <div status={['status_a']}>
                        Status A
                    </div>
                    <div status={['status_b']}>
                        Status B
                    </div>
                    <div status={['status_c', 'status_d']}>
                        Status C & D
                    </div>
                    <div status={['status_a', 'status_b']}>
                        Status A & B
                    </div>
                    <div status={['status_a', 'status_b', 'status_c', 'status_d']}>
                        Status A & B & C & D
                    </div>
                </ChildrenFilter>
            );
            expect(wrapper.containsMatchingElement(<div status={['status_c','status_d']}>Status C & D</div>)).to.equal(false);
            expect(wrapper.containsMatchingElement(<div status={['status_a','status_b']}>Status A & B</div>)).to.equal(true);
            expect(wrapper.containsMatchingElement(<div status={['status_a']}>Status A</div>)).to.equal(true);
            expect(wrapper.containsMatchingElement(<div status={['status_b']}>Status B</div>)).to.equal(true);
            expect(wrapper.containsMatchingElement(<div status={['status_a', 'status_b', 'status_c','status_d']}>Status A & B & C & D</div>)).to.equal(true);
        })
    })
    context("type='include_all'", () => {
        it("should render if all of the elements in the array are included.", () => {
            const wrapper = mount(
                <ChildrenFilter type='include_all' filter_key='status' filter={['status_a', 'status_b']}>
                    <div status={['status_a']}>
                        Status A
                    </div>
                    <div status={['status_b']}>
                        Status B
                    </div>
                    <div status={['status_c', 'status_d']}>
                        Status C & D
                    </div>
                    <div status={['status_a', 'status_b']}>
                        Status A & B
                    </div>
                    <div status={['status_a', 'status_b', 'status_c', 'status_d']}>
                        Status A & B & C & D
                    </div>
                </ChildrenFilter>
            );
            expect(wrapper.containsMatchingElement(<div status={['status_c','status_d']}>Status C & D</div>)).to.equal(false);
            expect(wrapper.containsMatchingElement(<div status={['status_a','status_b']}>Status A & B</div>)).to.equal(true);
            expect(wrapper.containsMatchingElement(<div status={['status_a']}>Status A</div>)).to.equal(false);
            expect(wrapper.containsMatchingElement(<div status={['status_b']}>Status B</div>)).to.equal(false);
            expect(wrapper.containsMatchingElement(<div status={['status_a', 'status_b', 'status_c','status_d']}>Status A & B & C & D</div>)).to.equal(true);
        })
    })

    context("type='except_any'", () => {
        it("should not render if any of the elements in the array are included.", () => {
            const wrapper = mount(
                <ChildrenFilter type='except_any' filter_key='status' filter={['status_a', 'status_b']}>
                    <div status={['status_a']}>
                        Status A
                    </div>
                    <div status={['status_b']}>
                        Status B
                    </div>
                    <div status={['status_c', 'status_d']}>
                        Status C & D
                    </div>
                    <div status={['status_a', 'status_b']}>
                        Status A & B
                    </div>
                    <div status={['status_a', 'status_b', 'status_c', 'status_d']}>
                        Status A & B & C & D
                    </div>
                </ChildrenFilter>
            );
            expect(wrapper.containsMatchingElement(<div status={['status_c','status_d']}>Status C & D</div>)).to.equal(true);
            expect(wrapper.containsMatchingElement(<div status={['status_a','status_b']}>Status A & B</div>)).to.equal(false);
            expect(wrapper.containsMatchingElement(<div status={['status_a']}>Status A</div>)).to.equal(false);
            expect(wrapper.containsMatchingElement(<div status={['status_b']}>Status B</div>)).to.equal(false);
            expect(wrapper.containsMatchingElement(<div status={['status_a', 'status_b', 'status_c','status_d']}>Status A & B & C & D</div>)).to.equal(false);
        })
    })

    context("type='except_all'", () => {
        it("should not render if all of the elements in the array are included.", () => {
            const wrapper = mount(
                <ChildrenFilter type='except_all' filter_key='status' filter={['status_a', 'status_b']}>
                    <div status={['status_a']}>
                        Status A
                    </div>
                    <div status={['status_b']}>
                        Status B
                    </div>
                    <div status={['status_c', 'status_d']}>
                        Status C & D
                    </div>
                    <div status={['status_a', 'status_b']}>
                        Status A & B
                    </div>
                    <div status={['status_a', 'status_b', 'status_c', 'status_d']}>
                        Status A & B & C & D
                    </div>
                </ChildrenFilter>
            );
            expect(wrapper.containsMatchingElement(<div status={['status_c','status_d']}>Status C & D</div>)).to.equal(true);
            expect(wrapper.containsMatchingElement(<div status={['status_a','status_b']}>Status A & B</div>)).to.equal(false);
            expect(wrapper.containsMatchingElement(<div status={['status_a']}>Status A</div>)).to.equal(true);
            expect(wrapper.containsMatchingElement(<div status={['status_b']}>Status B</div>)).to.equal(true);
            expect(wrapper.containsMatchingElement(<div status={['status_a', 'status_b', 'status_c','status_d']}>Status A & B & C & D</div>)).to.equal(false);
        })
    })
});
