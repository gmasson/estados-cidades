# Estados e Cidades
Populando selects com todos os estados e cidades do Brasil

## Configuração de local dos arquivos ##
Para configurar o local dos arquivos de estados e cidades, basta alterar a seguinte configuração no arquivo `customConfig.js` presente nesse repositório:
```javascript
EstadosCidades.config({
    mainUrl: '<diretorio_arquivos_estados_cidades>'
});
```
Onde `<diretorio_arquivos_estados_cidades>` é o diretório onde estará o arquivo `estados.json` e a pasta `cidades`
