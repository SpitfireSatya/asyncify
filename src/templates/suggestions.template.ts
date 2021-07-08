export const template = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <title>Code Duplicity Report</title>
    <style>
        
        .badge-error {
            background-color: tomato;
        }
        .error-div span {
            padding: 10px;
            min-height: 55px;
        }
    </style>
</head>

<body style="background-color:lightyellow">

    <div class="container" >
    
        <h1 class="text-center">Suggested transformations</h1>

        <div class="row error-div">
            <h3 class="text-center col-lg-4">Files Changed: {{statistics.filesChanged}}</h3>
            <h3 class="text-center col-lg-4">Sync Functions: {{statistics.syncTransformed}}</h3>
            <h3 class="text-center col-lg-4">Other changes*: {{statistics.relatedTransformed}}</h3>
        </div>
        <p>* Note: Other changes required are identified for each sync call and may contain duplicates.</p>

        <hr>

        {{#each suggestions as |suggestion suggestionKey|}}
            <div class="row text-center error-div" style="background-color: lavender; border: 1px solid; margin: 10px;">
                <span class="col-lg-8" style="border-top:1px solid; border-left:1px solid">id {{suggestionKey}}</span>
                <span class="col-lg-4" style="border-top:1px solid; border-right:1px solid"><button id="button{{suggestionKey}}" class="btn btn-success" onclick="expandTable({{suggestionKey}})">Show Details</button></span>

                <div id="detail{{suggestionKey}}" class="col-lg-12" style="display: none; border: 1px solid">
                {{#each suggestion as |transformation|}}
                <div style="margin-bottom: 5px; border: 1px solid;">
                    <div>

                        <div class="row text-center" style="background-color: lightgoldenrodyellow;">
                            <span class="col-lg-6" style="margin-top: 10px;"><b>File:</b> {{transformation.filename}}</span>
                            <span class="col-lg-3" style="margin-top: 10px;"><b>Start line:</b> {{transformation.startLine}}</span>
                            <span class="col-lg-3" style="margin-top: 10px;"><b>End line:</b> {{transformation.endLine}}</span>
                        </div>

                        <div class="text-left">
                            <span class="col-lg-6" style="border: 1px solid; background-color: lightyellow"><b>Before</b></span>
                            <span class="col-lg-6" style="border: 1px solid; background-color: lightyellow"><b>After</b></span>
                        </div>

                        <div class="text-left">
                            <span class="col-lg-6" style="border: 1px solid; height: 150px; overflow-y: scroll; background-color: lightgreen">
                                <pre style="background-color: inherit; border: 0px; padding: inherit; margin: inherit;">{{transformation.before}}</pre>
                            </span>
                            <span class="col-lg-6" style="border: 1px solid; height: 150px; overflow-y: scroll; background-color: lightcoral">
                                <pre style="background-color: inherit; border: 0px; padding: inherit; margin: inherit;">{{transformation.after}}</pre>
                            </span>
                        </div>

                    </div>
                </div>
                <br>
                {{/each}}
            </div>
            <br>
        </div>
        {{/each}}
        <div style="position: fixed;right: 10px;bottom: 10px">
            <button class="btn btn-primary" onclick="scrollToTop()">Scroll top</button>
        </div>
    </div>
</body>

<script>
    function expandTable(id) {
        let element = document.getElementById('detail'+id);
        element.style.display = (element.style.display === 'none') ? 'block' : 'none';
        document.getElementById('button'+id).textContent = (document.getElementById('button'+id).textContent === 'Show Details') ?
            'Hide Details' : 'Show Details';
    }

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

</script>

</html>`