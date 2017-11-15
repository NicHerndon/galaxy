define("mvc/workflow/workflow-view-terminals",["exports","mvc/workflow/workflow-terminals","mvc/workflow/workflow-connector"],function(e,n,t){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var a=i(n),o=i(t);window.workflow_globals=window.workflow_globals||{};var l=Backbone.View.extend({tagName:"div",className:"fa-icon-button fa fa-folder-o",initialize:function(e){this.$el.tooltip({delay:500,title:"Run tool in parallel over collection"}),this.model.bind("change",_.bind(this.render,this))},render:function(){this.model.mapOver.isCollection?this.$el.show():this.$el.hide()}}),r=l.extend({events:{click:"onClick",mouseenter:"onMouseEnter",mouseleave:"onMouseLeave"},onMouseEnter:function(e){var n=this.model;!n.terminal.connected()&&n.mapOver.isCollection&&this.$el.css("color","red")},onMouseLeave:function(e){this.$el.css("color","black")},onClick:function(e){var n=this.model;!n.terminal.connected()&&n.mapOver.isCollection&&n.terminal.resetMapping()}}),s=Backbone.View.extend({setupMappingView:function(e){var n=new this.terminalMappingClass({terminal:e}),t=new this.terminalMappingViewClass({model:n});t.render(),e.terminalMappingView=t,this.terminalMappingView=t},terminalElements:function(){return this.terminalMappingView?[this.terminalMappingView.el,this.el]:[this.el]}}),p=s.extend({className:"terminal input-terminal",initialize:function(e){var n=e.node,t=e.input,i=t.name,a=this.terminalForInput(t);a.multiple||this.setupMappingView(a),this.el.terminal=a,a.node=n,a.name=i,n.input_terminals[i]=a},events:{dropinit:"onDropInit",dropstart:"onDropStart",dropend:"onDropEnd",drop:"onDrop",hover:"onHover"},onDropInit:function(e,n){var t=this.el.terminal;return $(n.drag).hasClass("output-terminal")&&t.canAccept(n.drag.terminal)},onDropStart:function(e,n){n.proxy.terminal&&(n.proxy.terminal.connectors[0].inner_color="#BBFFBB")},onDropEnd:function(e,n){n.proxy.terminal&&(n.proxy.terminal.connectors[0].inner_color="#FFFFFF")},onDrop:function(e,n){var t=this.el.terminal;new o.default(n.drag.terminal,t).redraw()},onHover:function(){var e=this.el,n=e.terminal;if(n.connectors.length>0){var t=$("<div class='callout'></div>").css({display:"none"}).appendTo("body").append($("<div class='button'></div>").append($("<div/>").addClass("fa-icon-button fa fa-times").click(function(){$.each(n.connectors,function(e,n){n&&n.destroy()}),t.remove()}))).bind("mouseleave",function(){$(this).remove()});t.css({top:$(e).offset().top-2,left:$(e).offset().left-t.width(),"padding-right":$(e).width()}).show()}}}),c=p.extend({terminalMappingClass:a.default.TerminalMapping,terminalMappingViewClass:r,terminalForInput:function(e){return new a.default.InputTerminal({element:this.el,input:e})}}),u=p.extend({terminalMappingClass:a.default.TerminalMapping,terminalMappingViewClass:r,terminalForInput:function(e){return new a.default.InputCollectionTerminal({element:this.el,input:e})}}),m=s.extend({className:"terminal output-terminal",initialize:function(e){var n=e.node,t=e.output,i=t.name,a=this.terminalForOutput(t);this.setupMappingView(a),this.el.terminal=a,a.node=n,a.name=i,n.output_terminals[i]=a},events:{drag:"onDrag",dragstart:"onDragStart",dragend:"onDragEnd"},onDrag:function(e,n){var t=function(){var e=$(n.proxy).offsetParent().offset(),t=n.offsetX-e.left,i=n.offsetY-e.top;$(n.proxy).css({left:t,top:i}),n.proxy.terminal.redraw(),window.workflow_globals.canvas_manager.update_viewport_overlay()};t(),$("#canvas-container").get(0).scroll_panel.test(e,t)},onDragStart:function(e,n){$(n.available).addClass("input-terminal-active"),window.workflow_globals.workflow.check_changes_in_active_form();var t=$('<div class="drag-terminal" style="position: absolute;"></div>').appendTo("#canvas-container").get(0);t.terminal=new a.default.OutputTerminal({element:t});var i=new o.default;return i.dragging=!0,i.connect(this.el.terminal,t.terminal),t},onDragEnd:function(e,n){var t=n.proxy.terminal.connectors[0];t&&t.destroy(),$(n.proxy).remove(),$(n.available).removeClass("input-terminal-active"),$("#canvas-container").get(0).scroll_panel.stop()}}),d=m.extend({terminalMappingClass:a.default.TerminalMapping,terminalMappingViewClass:l,terminalForOutput:function(e){var n=e.extensions;return new a.default.OutputTerminal({element:this.el,datatypes:n})}}),f=m.extend({terminalMappingClass:a.default.TerminalMapping,terminalMappingViewClass:l,terminalForOutput:function(e){var n=e.collection_type,t=e.collection_type_source;return new a.default.OutputCollectionTerminal({element:this.el,collection_type:n,collection_type_source:t,datatypes:e.extensions})}});e.default={InputTerminalView:c,OutputTerminalView:d,InputCollectionTerminalView:u,OutputCollectionTerminalView:f}});
//# sourceMappingURL=../../../maps/mvc/workflow/workflow-view-terminals.js.map
