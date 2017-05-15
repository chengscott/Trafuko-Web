var expect = require(('expect'));

import Main from 'components/Main.jsx';

describe('Main', () => {
    // Basic Test
    it('should property run tests', () =>{
        expect(1).toBe(1);
    });

    it('component Exists', () =>{
        expect(Main).toExist();
    });

})

