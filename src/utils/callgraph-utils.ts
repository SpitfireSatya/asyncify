
export class CallgraphUtils {

  public static getFileName(callGraphNode: string): string {
    return callGraphNode.slice(callGraphNode.indexOf('(') + 1, callGraphNode.indexOf(':'));
  }

  public static getFunctionStart(callGraphNode: string): number {
    return parseFloat(callGraphNode.slice(callGraphNode.indexOf('<') + 1, callGraphNode.indexOf('>--')).replace(',', '.'));
  }

  public static getFunctionEnd(callGraphNode: string): number {
    return parseFloat(callGraphNode.slice(callGraphNode.indexOf('--<') + 3, callGraphNode.indexOf('>)')).replace(',', '.'));
  }

}
