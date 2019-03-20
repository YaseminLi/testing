import React from "react";
import {mount} from "enzyme";//完整的DOM渲染
import Demo from "../src/demo";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import sinon from 'sinon';

//测试用例
describe('UI test #demo',()=>{
    it('should have title',()=>{
        const wrapper=mount(<Demo />);
        const title=wrapper.find('h1');
        expect(title).toHaveLength(1);//能找到一个title
        expect(title.text()).toBe("This is a demo");//title为……
    });

    //测试点击事件
    it('should add 1 when click button',()=>{
        const wrapper=mount(<Demo />);
        const counter=wrapper.find('.counter');
        const v1=parseInt(counter.text());//click前的value
        wrapper.find('button').simulate('click');//模拟button的一次点击事件
        const v2=parseInt(counter.text());//click后的value
        expect(v2).toBe(v1+1);
    });

    //测试change事件
    it('should change when input number',()=>{
        const wrapper=mount(<Demo />);
        const counter=wrapper.find('.counter');
        wrapper.find('input').simulate('change',{
            target:{
                value:5
            }
        });//模拟input事件
        expect(counter.text()).toBe("5");//注意5的类型，需要为string
    });

      //测试prop事件
      it('should change when props change',()=>{
        const wrapper=mount(<Demo title="Demo1" value={5}/>);
        sinon.spy(Demo.prototype,'componentWillReceiveProps');
        const title=wrapper.find('h1');
        wrapper.setProps({
            title:'Demo2'});//接受一个props对象，重新设置其内容
        expect(title.text()).toBe("Demo2");//注意5的类型，需要为string
        const callCount=Demo.prototype.componentWillReceiveProps.callCount;//function 被调用的次数
        expect(callCount).toBe(1);
    });
});