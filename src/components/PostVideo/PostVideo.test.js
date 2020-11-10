import React from "react";
import renderer from 'react-test-renderer';

import PostVideo from "./PostVideo";

describe("PostVideo", ()=> {

    it('snapshop Post Video', () => {
        const tree = renderer.create(<PostVideo identifier="test" />).toJSON();
        expect(tree).toMatchSnapshot();         
    });

})


