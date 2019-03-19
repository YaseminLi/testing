const {add,mul,cover}=require('../src/main');
const {should,expect,assert}=require('chai');

describe('Math',function(){
    describe('#add',()=>{
        it('should return 5 when 2+3',()=>{
            expect(add(2,3)).equal(5);
        });
        it('should return 5 when 2+3',()=>{
            expect(add(2,-3)).equal(-1);
        });
    });
    describe('#mul',()=>{
        it('should return 5 when 2*3',()=>{
            expect(mul(2,3)).equal(6);
        });
    })
    describe('#cover',()=>{
        it('should return 1 when 3>2',()=>{
            expect(cover(3,2)).equal(1);
        });
    })
}

);

