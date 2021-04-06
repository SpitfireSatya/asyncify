import javascript
import analysis

class MyAnalysis extends Analysis {
    MyAnalysis() { 
        this = TShort()
    }

    override 
    predicate isMainFile(File file){
        file.getAbsolutePath().indexOf("src/test") != -1
    }
    
}

// call graph edges (for unit tests, without nodes)
from MyAnalysis analysis, Node sourceNode, Node targetNode
where analysis.callGraphEdge(sourceNode, targetNode) 
select sourceNode, targetNode
