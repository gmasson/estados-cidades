(function($) {
    var EstadosCidades = function (
        estadoSelector,
        cidadeSelector,
        estadoDefault
    ) {
        this.$estadoElement = $(estadoSelector);
        this.$cidadeElement = $(cidadeSelector);
        this.estadoDefault = estadoDefault;

        this.init();
    };

    EstadosCidades.prototype.estados = [];
    EstadosCidades.prototype.cidades = {};

    EstadosCidades.prototype.init = function() {
        var that = this;
        this.loadEstados();

        this.$estadoElement.on('change', function() {
            that.loadCidades();
        });
    };

    EstadosCidades.prototype.loadEstados = function() {
        var that = this;

        if (EstadosCidades.prototype.estados.length > 0) {
            this.renderEstados();
            return;
        }

        $.getJSON('estados.json', function (data) {
            EstadosCidades.prototype.estados = data;
            that.renderEstados();
        });
    };

    EstadosCidades.prototype.loadCidades = function() {
        var that = this,
            estadoSelected = this.$estadoElement.val();

        if (EstadosCidades.prototype.cidades[estadoSelected]) {
            this.renderCidades(estadoSelected);
            return;
        }

        $.getJSON('cidades/'+ estadoSelected +'.json', function (cidades) {
            EstadosCidades.prototype.cidades[estadoSelected] = cidades;
            that.renderCidades(estadoSelected);
        });
    };

    EstadosCidades.prototype.renderCidades = function(estado) {
        var that = this,
            cidades = EstadosCidades.prototype.cidades[estado];

        that.$cidadeElement.empty();
        $.each(cidades, function(key, value) {
            var option = $("<option/>", {
                value: value,
                text: value
            });

            that.$cidadeElement.append(option);
        });
    };

    EstadosCidades.prototype.renderEstados = function() {
        var that = this;

        $.each(EstadosCidades.prototype.estados, function(key, value) {
            var option = $("<option/>", {
                value: value.sigla,
                text: value.nome
            });

            if (value.sigla == that.estadoDefault) {
                option.prop('selected', true);
            }

            that.$estadoElement.append(option);
        });

        this.loadCidades();
    };

    window.EstadosCidades = EstadosCidades;
}(jQuery));