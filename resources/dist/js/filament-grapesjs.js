// resources/js/index.js
document.addEventListener("alpine:init", () => {
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
          height: minHeight + "px",
          container: container ? container : ".filament-grapesjs .grapesjs-wrapper",
          showOffsets: true,
          fromElement: true,
          noticeOnUnload: false,
          storageManager: false,
          loadHtml: state?.html,
          loadCss: state?.css,
          loadJs: state?.js,
          plugins,
          ...settings
        };
        this.instance = grapesjs.init(allSettings);
        this.instance.on("update", (e) => {
          var rawHtml = this.instance.getHtml({
            cleanId: true
          });
          var cssContent = this.instance.getCss();
          var jsContent = this.instance.getJs();
          var extract = rawHtml.match(/<body\b[^>]*>([\s\S]*?)<\/body>/);
          var htmlContent = extract ? extract[1] : rawHtml;
          this.state = {
            html: htmlContent,
            css: cssContent,
            js: jsContent
          };
        });
      }
    })
  );
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vanMvaW5kZXguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FscGluZTppbml0JywgKCkgPT4ge1xuICAgIEFscGluZS5kYXRhKFxuICAgICAgICBcImdyYXBlc2pzXCIsXG4gICAgICAgICh7IHN0YXRlLCBzdGF0ZVBhdGgsIHJlYWRPbmx5LCB0b29scywgbWluSGVpZ2h0LCBjb250YWluZXIsIHBsdWdpbnMsIHNldHRpbmdzIH0pID0+ICh7XG4gICAgICAgICAgICBpbnN0YW5jZTogbnVsbCxcbiAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgIHRvb2xzOiB0b29scyxcbiAgICAgICAgICAgIHBsdWdpbnM6IHBsdWdpbnMsXG4gICAgICAgICAgICBzZXR0aW5nczogc2V0dGluZ3MsXG4gICAgICAgICAgICBpbml0KCkge1xuICAgICAgICAgICAgICAgIGxldCBlbmFibGVkVG9vbHMgPSB7fTtcblxuICAgICAgICAgICAgICAgIGxldCBhbGxTZXR0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBtaW5IZWlnaHQgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lciA/IGNvbnRhaW5lciA6IFwiLmZpbGFtZW50LWdyYXBlc2pzIC5ncmFwZXNqcy13cmFwcGVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHNob3dPZmZzZXRzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmcm9tRWxlbWVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbm90aWNlT25VbmxvYWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzdG9yYWdlTWFuYWdlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGxvYWRIdG1sOiBzdGF0ZT8uaHRtbCxcbiAgICAgICAgICAgICAgICAgICAgbG9hZENzczogc3RhdGU/LmNzcyxcbiAgICAgICAgICAgICAgICAgICAgbG9hZEpzOiBzdGF0ZT8uanMsXG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbnM6IHBsdWdpbnMsXG4gICAgICAgICAgICAgICAgICAgIC4uLnNldHRpbmdzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSAgZ3JhcGVzanMuaW5pdCggYWxsU2V0dGluZ3MgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlLm9uKCd1cGRhdGUnLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhd0h0bWwgPSB0aGlzLmluc3RhbmNlLmdldEh0bWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW5JZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNzc0NvbnRlbnQgPSB0aGlzLmluc3RhbmNlLmdldENzcygpO1xuICAgICAgICAgICAgICAgICAgICB2YXIganNDb250ZW50ID0gdGhpcy5pbnN0YW5jZS5nZXRKcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHRyYWN0ID0gcmF3SHRtbC5tYXRjaCgvPGJvZHlcXGJbXj5dKj4oW1xcc1xcU10qPyk8XFwvYm9keT4vKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGh0bWxDb250ZW50ID0gZXh0cmFjdCA/IGV4dHJhY3RbMV0gOiByYXdIdG1sO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiBodG1sQ29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzczogY3NzQ29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzOiBqc0NvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIClcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxpQkFBaUIsZUFBZSxNQUFNO0FBQzNDLFNBQU87QUFBQSxJQUNIO0FBQUEsSUFDQSxDQUFDLEVBQUUsT0FBTyxXQUFXLFVBQVUsT0FBTyxXQUFXLFdBQVcsU0FBUyxTQUFTLE9BQU87QUFBQSxNQUNqRixVQUFVO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsT0FBTztBQUNILFlBQUksZUFBZSxDQUFDO0FBRXBCLFlBQUksY0FBYztBQUFBLFVBQ2QsUUFBUSxZQUFZO0FBQUEsVUFDcEIsV0FBVyxZQUFZLFlBQVk7QUFBQSxVQUNuQyxhQUFhO0FBQUEsVUFDYixhQUFhO0FBQUEsVUFDYixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixVQUFVLE9BQU87QUFBQSxVQUNqQixTQUFTLE9BQU87QUFBQSxVQUNoQixRQUFRLE9BQU87QUFBQSxVQUNmO0FBQUEsVUFDQSxHQUFHO0FBQUEsUUFDUDtBQUNBLGFBQUssV0FBWSxTQUFTLEtBQU0sV0FBWTtBQUM1QyxhQUFLLFNBQVMsR0FBRyxVQUFVLE9BQUs7QUFDNUIsY0FBSSxVQUFVLEtBQUssU0FBUyxRQUFRO0FBQUEsWUFDaEMsU0FBUztBQUFBLFVBQ2IsQ0FBQztBQUNELGNBQUksYUFBYSxLQUFLLFNBQVMsT0FBTztBQUN0QyxjQUFJLFlBQVksS0FBSyxTQUFTLE1BQU07QUFFcEMsY0FBSSxVQUFVLFFBQVEsTUFBTSxpQ0FBaUM7QUFDN0QsY0FBSSxjQUFjLFVBQVUsUUFBUSxDQUFDLElBQUk7QUFFekMsZUFBSyxRQUFRO0FBQUEsWUFDVCxNQUFNO0FBQUEsWUFDTixLQUFLO0FBQUEsWUFDTCxJQUFJO0FBQUEsVUFDUjtBQUFBLFFBQ0osQ0FBQztBQUFBLE1BQ0w7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
