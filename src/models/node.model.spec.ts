
import { expect } from 'chai';
import { Node } from './node.model';

describe('models', (): void => {
  describe('Node', (): void => {

    it('should create an instance of node with given source, target, id 0', (): void => {

      const node: Node = new Node('source', 'target');

      expect(<any>node['_id']).to.equal(0);
      expect(<any>node['_source']).to.equal('source');
      expect(<any>node['_target']).to.equal('target');

    });

    it('should return the source through getter', (): void => {

      const node: Node = new Node('source', 'target');

      expect(node.source).to.equal('source');

    });

    it('should return the target through getter', (): void => {

      const node: Node = new Node('target', 'target');

      expect(node.target).to.equal('target');

    });

    it('should return the id through getter', (): void => {

      const node: Node = new Node('id', 'target');

      expect(node.id).to.equal(0);

    });

    it('should update the id through setter', (): void => {

      const node: Node = new Node('source', 'target');

      node.id = 1;

      expect(<any>node['_id']).to.equal(1);

    });

    it('should return the parent through getter', (): void => {

      const node: Node = new Node('parent', 'target');

      expect(node.parent).to.equal(null);

    });

    it('should update the parent through setter', (): void => {

      const node: Node = new Node('source', 'target');
      const parent: Node = new Node(null, null);

      node.parent = parent;

      expect(<any>node['_parent']).to.equal(parent);

    });

    it('should add node to currentNode.children, with updated id and parent, and increment next id', (): void => {

      const node: Node = new Node('source', 'target');
      const parent: Node = new Node(null, null);

      parent.addChild = node;

      expect(parent.children[0]).to.equal(node);
      expect(node.parent).to.equal(parent);
      expect(node.id).to.equal(0);
      expect(parent['_nextChildId']).to.equal(1);

    });

    it('should children through the getter', (): void => {

      const node: Node = new Node('source', 'target');
      const parent: Node = new Node(null, null);

      parent.addChild = node;

      expect(parent.children).to.eql([node]);

    });

    it('should remove all children through removeChildren()', (): void => {

      const node: Node = new Node('source', 'target');
      const parent: Node = new Node(null, null);

      parent.addChild = node;
      parent.removeChildren();

      expect(parent.children).to.eql([]);

    });

    it('should remove child with given id through removeChild()', (): void => {

      const node: Node = new Node('source', 'target');
      const parent: Node = new Node(null, null);

      parent.addChild = node;
      parent.addChild = node;

      parent.removeChild(0);

      expect(parent.children[0].id).to.eql(1);

    });

  });
});
