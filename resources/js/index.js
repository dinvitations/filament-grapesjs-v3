document.addEventListener('alpine:init', () => {
    Alpine.data(
        "grapesjs",
        ({ state, statePath, readOnly, tools, minHeight, container, plugins, settings }) => ({
            instance: null,
            state: state,
            tools: tools,
            plugins: plugins,
            settings: settings,
            init() {
                let enabledTools = {};

                let allSettings = {
                    height: minHeight + 'px',
                    container: container ? container : ".filament-grapesjs .grapesjs-wrapper",
                    showOffsets: true,
                    fromElement: true,
                    noticeOnUnload: false,
                    storageManager: false,
                    loadProjectData: state?.projectData,
                    loadHtml: state?.html,
                    loadCss: state?.css,
                    loadJs: state?.js,
                    plugins: plugins,
                    ...settings
                }
                this.instance =  grapesjs.init( allSettings );
                this.instance.on('update', e => {
                    var projectData = this.instance.getProjectData();
                    var rawHtml = this.instance.getHtml({
                        cleanId: true
                    });
                    var cssContent = this.instance.getCss();
                    var jsContent = this.instance.getJs();

                    var extract = rawHtml.match(/<body\b[^>]*>([\s\S]*?)<\/body>/);
                    var htmlContent = extract ? extract[1] : rawHtml;

                    this.state = {
                        projectData,
                        html: htmlContent,
                        css: cssContent,
                        js: jsContent
                    };
                })
            }
        })
    )
})
