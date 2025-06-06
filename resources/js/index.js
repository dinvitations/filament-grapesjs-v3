let grapesInstance = null;

document.addEventListener('alpine:init', () => {
    Alpine.data(
        "grapesjs",
        ({ state, statePath, readOnly, tools, minHeight, container, plugins, settings }) => ({
            instance: null,
            state,
            tools,
            plugins,
            settings,

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
                };

                grapesInstance = grapesjs.init(allSettings);

                this.instance = grapesInstance;

                grapesInstance.on('load', () => {
                    if (isNotEmpty(this.state?.grapesjs?.projectData)) {
                        grapesInstance.loadProjectData(JSON.parse(this.state.grapesjs.projectData));
                    } else {
                        if (isNotEmpty(this.state?.grapesjs?.components)) {
                            grapesInstance.setComponents(JSON.parse(this.state.grapesjs.components));
                        } else if (isNotEmpty(this.state?.html)) {
                            grapesInstance.setComponents(this.state.html);
                        }

                        if (isNotEmpty(this.state?.grapesjs?.style)) {
                            grapesInstance.setStyle(JSON.parse(this.state.grapesjs.style));
                        } else if (isNotEmpty(this.state?.css)) {
                            grapesInstance.setStyle(this.state.css);
                        }
                    }
                });

                grapesInstance.on('update', () => {
                    const projectData = grapesInstance.getProjectData();
                    const components = grapesInstance.getComponents();
                    const styles = grapesInstance.getStyle();

                    const rawHtml = grapesInstance.getHtml({ cleanId: true });
                    const cssContent = grapesInstance.getCss();
                    const jsContent = grapesInstance.getJs();

                    const extract = rawHtml.match(/<body\b[^>]*>([\s\S]*?)<\/body>/);
                    const htmlContent = extract ? extract[1] : rawHtml;

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
                });
            }
        })
    );
});

function isNotEmpty(val) {
    if (val === null || val === undefined) return false;

    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === 'object') return Object.keys(val).length > 0;
    if (typeof val === 'string') return val.trim() !== '' && val.trim() !== '0';

    return !!val;
}
