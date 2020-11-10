import React from "react";
import renderer from 'react-test-renderer';

import PostFiles from "./PostFiles";

describe("PostFiles", ()=> {

    let mockData=[{
        format: "mp3",
        name : "test",
        size : 150
    }];
    it('snapshot Post Files', () => {
        const tree = renderer.create(<PostFiles 
            identifier= "test"
            urls={{
                downloadFile : "df",
                downloadCompress : "dc"
            }}
            files={mockData} />).toJSON();
        expect(tree).toMatchSnapshot();         
    });

})


