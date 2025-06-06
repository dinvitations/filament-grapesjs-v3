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
                    plugins: plugins,
                    ...settings
                }
                this.instance =  grapesjs.init( allSettings );
                this.instance.on('load', e => {
                    if (isNotEmpty(this.state?.grapesjs?.projectData)) {
                        this.instance.loadProjectData(JSON.parse(this.state.grapesjs.projectData));
                    } else {
                        if (isNotEmpty(this.state?.grapesjs?.components)) {
                            this.instance.setComponents(JSON.parse(this.state.grapesjs.components));
                        } else if (isNotEmpty(this.state?.html)) {
                            this.instance.setComponents(this.state.html);
                        }

                        if (isNotEmpty(this.state?.grapesjs?.style)) {
                            this.instance.setStyle(JSON.parse(this.state.grapesjs.style));
                        } else if (isNotEmpty(this.state?.css)) {
                            this.instance.setStyle(this.state.css);
                        }
                    }
                });
                this.instance.on('update', e => {
                    var projectData = this.instance.getProjectData();
                    var components = this.instance.getComponents();
                    var styles = this.instance.getStyle();

                    var rawHtml = this.instance.getHtml({
                        cleanId: true
                    });
                    var cssContent = this.instance.getCss();
                    var jsContent = this.instance.getJs();

                    var extract = rawHtml.match(/<body\b[^>]*>([\s\S]*?)<\/body>/);
                    var htmlContent = extract ? extract[1] : rawHtml;

                    this.state = {
                        grapesjs: {
                            projectData,
                            components,
                            styles
                        },
                        html: htmlContent,
                        css: cssContent,
                        js: jsContent
                    };
                })
            }
        })
    )
})

function isNotEmpty(val) {
    if (val === null || val === undefined) return false;

    if (Array.isArray(val)) {
        return val.length > 0;
    }

    if (typeof val === 'object') {
        return Object.keys(val).length > 0;
    }

    if (typeof val === 'string') {
        return val.trim() !== '' && val.trim() !== '0';
    }

    return !!val;
}
