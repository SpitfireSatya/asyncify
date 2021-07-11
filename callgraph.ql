
import javascript
import analysis

class MyAnalysis extends Analysis {
    MyAnalysis() { 
        this = TLong()
    }

    override 
    predicate isMainFile(File file){
        file.getAbsolutePath().indexOf(".js") != -1
    }
    
}

// call graph edges (for unit tests, without nodes)
from MyAnalysis analysis, Node sourceNode, Node targetNode
where analysis.callGraphEdge(sourceNode, targetNode) 
select sourceNode, targetNode
