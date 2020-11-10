import React from "react";
import renderer from 'react-test-renderer';

import PostDetails from "./PostDetails";

describe("PostDetails", ()=> {

    it('snapshot metadata post details', () => {
        const tree = renderer.create(<PostDetails metadata={{key1: "data1"}} />).toJSON();
        expect(tree).toMatchSnapshot();         
    });

})


