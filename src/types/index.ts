import { TreeNodeData } from '@mantine/core';

// the type of the function retrieving the relevant filetree from the user's filesystem in the `TreeNodeData[]` format
export type GetTreeNodeData = (path: string) => Promise<Array<TreeNodeData>>;

// the type of the function retrieving the contents of a particular file from the user's filesystem
export type GetFileContents = (path: string) => Promise<string>;

// an interface made up of attributes used to describe any node in the network fully (contains all data required to render each node and find their file contents)
export interface Node {

}

// an interface containing the unique ids of the nodes a connection is drawn from and to
export interface Connection {
  from: number;
  to: number;
}

// a type containing all the properties each file icon (displayed the the left of each file name in the sidebar) will have
export type FileIconProps = {
  name: string;
  isFolder: boolean;
  expanded: boolean;
};

// a type containing the properties that can be passed in to the create file element (the data needed to create a new file)
export type CreateFileProps = {
  filePath: string;
  name: string;
  files: Array<TreeNodeData>;
};
