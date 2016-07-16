(function() {
    var EstadosCidades = function (
        estadoSelector,
        cidadeSelector,
        estadoDefault
    ) {
        this.estadoElement = document.getElementById(estadoSelector);
        this.cidadeElement = document.getElementById(cidadeSelector);
        this.estadoDefault = estadoDefault;

        this.init();
    };

    EstadosCidades.prototype.estados = [];
    EstadosCidades.prototype.cidades = {};

    EstadosCidades.prototype.init = function() {
        var that = this;
        this.loadEstados();

        this.estadoElement.onchange = function() {
            that.loadCidades();
        };
    };

    EstadosCidades.prototype.loadEstados = function() {
        var that = this;

        if (EstadosCidades.prototype.estados.length > 0) {
            this.renderEstados();
            return;
        }

        getJSON('estados.json', function (data) {
            EstadosCidades.prototype.estados = data;
            that.renderEstados();
        });
    };

    EstadosCidades.prototype.loadCidades = function() {
        var that = this,
            estadoSelected = this.estadoElement.value;

        if (EstadosCidades.prototype.cidades[estadoSelected]) {
            this.renderCidades(estadoSelected);
            return;
        }

        getJSON('cidades/'+ estadoSelected +'.json', function (cidades) {
            EstadosCidades.prototype.cidades[estadoSelected] = cidades;
            that.renderCidades(estadoSelected);
        });
    };

    EstadosCidades.prototype.renderCidades = function(estado) {
        var i = 0,
            cidades = EstadosCidades.prototype.cidades[estado];

        while (this.cidadeElement.firstChild) {
            this.cidadeElement.removeChild(this.cidadeElement.firstChild);
        }

        for (; i < cidades.length; i++) {
            var option = document.createElement("option");
            option.text = cidades[i];
            option.value = cidades[i];

            this.cidadeElement.appendChild(option);
        }
    };

    EstadosCidades.prototype.renderEstados = function() {
        var i = 0,
            estados = EstadosCidades.prototype.estados;

        for (; i < estados.length; i++) {
            var option = document.createElement("option");
            option.text = estados[i].nome;
            option.value = estados[i].sigla;

            if (estados[i].sigla == this.estadoDefault) {
                option.selected = true;
            }

            this.estadoElement.appendChild(option);
        }

        this.loadCidades();
    };

    function getJSON(url, callback) {
      httpRequest = new XMLHttpRequest();

      httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState != 4) {
                return
            };

            callback(JSON.parse(httpRequest.responseText));
        };

        httpRequest.open("GET", url, true);
        httpRequest.send(null);
    };

    window.EstadosCidades = EstadosCidades;
}());