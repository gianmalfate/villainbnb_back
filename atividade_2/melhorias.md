**Atividade - Serviço de gravação contínua**

*Estruturação*

- Problema: Os status codes não se encontram estritamente padronizados no projeto. Em alguns arquivos eles aparecem por meio da função “handleError” ou outras funções
que vieram do arquivo de erros “ErrorHandler.ts”, mas em outros arquivos os erros são expostos diretamente.

- Solução: Seria importante padronizar, usando a função “handleError” e outras do “ErrorHandler” nos arquivos do projeto. O ideal seria no arquivo “ErrorHandler.ts”
abranger todos os tipos de erros possíveis status (400s) e importar esse arquivo para os outros usarem funções e erros já criados, assim como o “handleError” já é 
importado e usado no “plataform.route.ts”  e no “Mongo.ts”. No “prometheus.ts”, ao invés de possuir uma própria função “handleError”, podia haver sua importação direto
do arquivo “ErrorHandler.ts”, padronizando os erros em todo o projeto.
PS:. Inclusive os retornos de sucesso status (200s) poderiam ser padronizados e apenas importados nos arquivos posteriormente também.


- Problema: No arquivo “plataform.route.ts” da pasta “routes”, o parâmetro “next” é passado nas funções, mas não é utilizado (seu valor nunca é lido).

- Solução: Eliminar os parâmetros “next” não usados nas funções para gerar um código mais limpo e menos confuso.



*Performance*

- Problema: No arquivo “requestLoger.ts”, o request/tipo “AuditingRequest” não possui as propriedades “body, query, params, mehod, originalUrl”.

- Solução: Averiguar a interface e determinar as propriedades para o tipo (“AuditingRequest”).



*Organização de arquivos e pastas*

- Problema: A disposição dos arquivos e pastas do projeto não se encontra de uma forma bem organizada e intuitiva.

- Solução: O ideal seria criar uma nova pasta “app” por exemplo e adicionar tudo aquilo que será bastante analisado e alterado durante a criação e manutenção da
aplicação (logs; mongo {_ mocks _, Mongo.ts, MongoEvent.ts}; prometheus e routes), mantendo essa pasta na “src” juntamente com outras pastas como: config, errors,
utils (com apenas fields.ts, success.ts, validator.ts) e os arquivos app.ts e index.tx.

![Screenshot (57)](https://user-images.githubusercontent.com/90017824/224119038-fcc0c9a6-0724-4f47-91f7-9ea718a68834.png)


- Problema: A disposição das informações no arquivo “plataform.route.ts” se encontra um pouco despadronizada.

- Solução: Seria interessante rearranjar algumas funções para seguirem um padrão de exposição, invertendo por exemplo de posição as funções “handleDeleteCameraDiaId”
e “handleDeleteCameraDia”.



*Tratamento de erros*

- Problema: (Docker) Se o container usa volumes mapeados para armazenamento persistente, o problema pode vir de dados obsoletos nessas pastas. A configuração padrão
do Sitecore permite isso para os serviços “mssql” e “solr”.

- Solução: Certificar-se de que a instância esteja inativa (ou seja, docker-compose inativa) e exclua os arquivos nas pastas montadas manualmente ou com um script 
limpo (consulte os exemplos clean.ps1 no repositório de exemplos do Docker). o ideal no caso do projeto seria criar um script para combater esse erro e deixar a 
aplicação segura.


- Problema: No arquivo “requestLogger.ts” os status codes 400s estão sendo tratados como “warnings” e os 500s como “errors”.

- Solução: Apesar dos status codes 400s serem “client error responses”, nem todos deles podem ser tratados como “warns” apenas, pois podem ser fatais para a operação
da aplicação, assim devem ser tratados como “error” também. Dessa forma, a solução seria reaver os tratamentos e determinar o que serão considerados “warns” e o que 
serão “errors”.



*Segurança*

- Problema: Falta do uso de todas as mensagens de “SUCESS” do arquivo “succes.ts”.

- Solução: É importante utilizar
    “res.status(200).send(SUCCESS.OPERATIONS.DELETE_EVENT)
     res.status(200).send(SUCCESS.OPERATIONS.DELETE_DIA)
     res.status(200).send(SUCCESS.OPERATIONS.	QUERY_EVENT)”
para manter o controle e segurança das ações para funcionarem da forma correta e esperada.
