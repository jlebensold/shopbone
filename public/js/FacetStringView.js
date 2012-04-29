window.FacetStringView = FacetBaseView.extend({
	tagName: 'div',
	type: 'string',
	className: 'accordion-group',
	events: {
		"change input": "facetChanged"
	},
	initialize: function() {
		_.bindAll(this,'render','setFacetData','prepareAccordion','facetChanged','contains');
	},
	setFacetData: function(d) {
		this.title = this.capitalizeFirstLetter(d.name);
		this.elId = this.title.replace(' ','');
		this.values = d.values;
		this.facetvalue = this.values;
	},

	facetChanged: function() {
		this.facetvalue = _.map($(this.el).find("input:checked"),function(e) { return $(e).val(); } );
		this.trigger('facetChanged',this.facetvalue,this);
	},
	render: function() {
		this.prepareAccordion();
		$(this.el).find('.accordion-body').append('<ul class="unstyled"></ul>');
		_.each(this.values,function(v) {
			var checked = (this.facetvalue.indexOf(v) != -1) ? 'checked="checked"' : '';
			$(this.el).find('ul').append('<li>'+
					'<label class="checkbox"><input type="checkbox" value="'+v+'" '+checked+'></input>'+v+'</label>'+
				'</li>');
		},this);
		return this;
	},
	contains: function(val) {
		val = _.flatten([val]);
		return _.intersection(this.facetvalue,val).length > 0;
	}

});
