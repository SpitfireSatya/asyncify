
export class Node {

  private _id: number = 0;
  private _source: string;
  private _target: string;
  private _children: { [key: number]: Node } = {};
  private _parent: Node = null;
  private _nextChildId: number = 0;

  constructor(source: string, target: string) {
    this._source = source;
    this._target = target;
  }

  public get source(): string {
    return this._source;
  }

  public get target(): string {
    return this._target;
  }


  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get parent(): Node {
    return this._parent;
  }

  public set parent(node: Node) {
    this._parent = node;
  }

  public set addChild(node: Node) {
    node.parent = this;
    node.id = this._nextChildId;
    this._children[this._nextChildId] = node;
    this._nextChildId++;
  }

  public get children(): Array<Node> {
    return Object.values(this._children);
  }

  public removeChildren(): void {
    this._children = {};
  }

  public removeChild(id: number): void {
    delete this._children[id];
  }

}
