import React from 'react';
import './PostFiles.scss';

function PostFiles(props){

    const exceptionKeys = ["Unknown", "Metadata"];

    var fileTypes = [];
    props.files.filter(file => exceptionKeys.indexOf(file.format) === -1 )
        .map(file => {
            
            if(fileTypes[file.format] === undefined){
                fileTypes[file.format] = {
                    format : file.format,
                    fileCount : 0,
                    totalSize : 0,
                    name : file.name
                };
            }
            fileTypes[file.format].fileCount++;
            fileTypes[file.format].totalSize += file.size === undefined ? 0 : Math.round(file.size/1024);
        });
    
    let fileRows = Object.keys(fileTypes).map(format => {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <a target="blank" href={
                    fileTypes[format].fileCount>1 
                        ? props.urls.downloadCompress + props.identifier + "/format=" + format
                        : props.urls.downloadFile + props.identifier + "/" + fileTypes[format].name }>
                
                {format}{fileTypes[format].fileCount > 1 ? 
                "( " + fileTypes[format].fileCount + " files )" : ""}</a>
                <span className="badge post-files-size">
                    {fileTypes[format].totalSize} MB</span>
            </li> );
    });

    return (
        <ul className="list-group">
            <li className="list-group-item list-group-item-secondary">Download Options</li>
            {fileRows}
        </ul>
    );
}
/**/
export default PostFiles;