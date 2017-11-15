define("mvc/library/library-folder-view",["exports","libs/toastr","mvc/library/library-model","mvc/ui/ui-select"],function(e,t,s,i){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var r=o(t),a=o(s),n=o(i),l=Backbone.View.extend({el:"#center",model:null,options:{},events:{"click .toolbtn_save_permissions":"savePermissions"},initialize:function(e){this.options=_.extend(this.options,e),this.options.id&&this.fetchFolder()},fetchFolder:function(e){this.options=_.extend(this.options,e),this.model=new a.default.FolderAsModel({id:this.options.id});var t=this;this.model.fetch({success:function(){t.options.show_permissions&&t.showPermissions()},error:function(e,t){void 0!==t.responseJSON?r.default.error(t.responseJSON.err_msg+" Click this to go back.","",{onclick:function(){Galaxy.libraries.library_router.back()}}):r.default.error("An error occurred. Click this to go back.","",{onclick:function(){Galaxy.libraries.library_router.back()}})}})},showPermissions:function(e){this.options=_.extend(this.options,e),$(".tooltip").remove();var t=!1;Galaxy.user&&(t=Galaxy.user.isAdmin());var s=this.templateFolderPermissions();this.$el.html(s({folder:this.model,is_admin:t}));var i=this;$.get(Galaxy.root+"api/folders/"+i.id+"/permissions?scope=current").done(function(e){i.prepareSelectBoxes({fetched_permissions:e})}).fail(function(){r.default.error("An error occurred while attempting to fetch folder permissions.")}),$("#center [data-toggle]").tooltip(),$("#center").css("overflow","auto")},_serializeRoles:function(e){for(var t=[],s=0;s<e.length;s++)t.push(e[s][1]+":"+e[s][0]);return t},prepareSelectBoxes:function(e){this.options=_.extend(this.options,e);var t=this.options.fetched_permissions,s=this,i=this._serializeRoles(t.add_library_item_role_list),o=this._serializeRoles(t.manage_folder_role_list),r=this._serializeRoles(t.modify_folder_role_list);s.addSelectObject=new n.default.View(this._createSelectOptions(this,"add_perm",i,!1)),s.manageSelectObject=new n.default.View(this._createSelectOptions(this,"manage_perm",o,!1)),s.modifySelectObject=new n.default.View(this._createSelectOptions(this,"modify_perm",r,!1))},_createSelectOptions:function(e,t,s){return{minimumInputLength:0,css:t,multiple:!0,placeholder:"Click to select a role",container:e.$el.find("#"+t),ajax:{url:Galaxy.root+"api/folders/"+e.id+"/permissions?scope=available",dataType:"json",quietMillis:100,data:function(e,t){return{q:e,page_limit:10,page:t}},results:function(e,t){var s=10*t<e.total;return{results:e.roles,more:s}}},formatResult:function(e){return e.name+" type: "+e.type},formatSelection:function(e){return e.name},initSelection:function(e,t){var s=[];$(e.val().split(",")).each(function(){var e=this.split(":");s.push({id:e[0],name:e[1]})}),t(s)},initialData:s.join(","),dropdownCssClass:"bigdrop"}},_extractIds:function(e){for(var t=[],s=e.length-1;s>=0;s--)t.push(e[s].id);return t},savePermissions:function(e){var t=this,s=this._extractIds(this.addSelectObject.$el.select2("data")),i=this._extractIds(this.manageSelectObject.$el.select2("data")),o=this._extractIds(this.modifySelectObject.$el.select2("data"));$.post(Galaxy.root+"api/folders/"+t.id+"/permissions?action=set_permissions",{"add_ids[]":s,"manage_ids[]":i,"modify_ids[]":o}).done(function(e){t.showPermissions({fetched_permissions:e}),r.default.success("Permissions saved.")}).fail(function(){r.default.error("An error occurred while attempting to set folder permissions.")})},templateFolderPermissions:function(){return _.template(['<div class="library_style_container">','<div id="library_toolbar">','<a href="#/folders/<%= folder.get("parent_id") %>">','<button data-toggle="tooltip" data-placement="top" title="Go back to the parent folder" class="btn btn-default primary-button" type="button">','<span class="fa fa-caret-left fa-lg"/>',"&nbsp;Parent folder","</button>","</a>","</div>","<h1>",'Folder: <%= _.escape(folder.get("name")) %>',"</h1>",'<div class="alert alert-warning">',"<% if (is_admin) { %>","You are logged in as an <strong>administrator</strong> therefore you can manage any folder on this Galaxy instance. Please make sure you understand the consequences.","<% } else { %>","You can assign any number of roles to any of the following permission types. However please read carefully the implications of such actions.","<% }%>","</div>",'<div class="dataset_table">',"<h2>Folder permissions</h2>","<h4>","Roles that can manage permissions on this folder","</h4>",'<div id="manage_perm" class="manage_perm roles-selection"/>','<div class="alert alert-info roles-selection">',"User with <strong>any</strong> of these roles can manage permissions on this folder.","</div>","<h4>","Roles that can add items to this folder","</h4>",'<div id="add_perm" class="add_perm roles-selection"/>','<div class="alert alert-info roles-selection">',"User with <strong>any</strong> of these roles can add items to this folder (folders and datasets).","</div>","<h4>","Roles that can modify this folder","</h4>",'<div id="modify_perm" class="modify_perm roles-selection"/>','<div class="alert alert-info roles-selection">',"User with <strong>any</strong> of these roles can modify this folder (name, etc.).","</div>",'<button data-toggle="tooltip" data-placement="top" title="Save modifications" class="btn btn-default toolbtn_save_permissions primary-button" type="button">','<span class="fa fa-floppy-o"/>',"&nbsp;Save","</button>","</div>","</div>"].join(""))}});e.default={FolderView:l}});
//# sourceMappingURL=../../../maps/mvc/library/library-folder-view.js.map
