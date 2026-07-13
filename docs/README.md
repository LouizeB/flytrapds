# Flytrap DS — Documentação

Design system multibrand com arquitetura semântica e acessibilidade APCA verificada em CI.

## Comece por aqui

Esta documentação usa uma linguagem compartilhada entre design e desenvolvimento. Cada trilha indica uma ordem de leitura; os documentos continuam únicos para evitar versões contraditórias do sistema.

Consulta rápida: [mapa separado da arquitetura semântica](../architecture/README.md).

### Trilha Product Design

Para entender decisões, criar novas experiências e preparar handoff:

1. [Visão geral e conceito da marca](00-overview.md)
2. [Arquitetura de tokens](01-architecture-tokens.md)
3. [Escala e papel das cores](02-color-scale.md)
4. [Acessibilidade APCA](03-accessibility-apca.md)
5. [Inventário e prioridades](04-components.md)
6. [Multibrand, modes e themes](05-multibrand.md)
7. [Anatomia e Definition of Done](12-component-anatomy.md)
8. [Iconografia semântica](13-iconography.md)
9. [Contrato de contexto para IA](14-ai-context-contract.md)
10. [Experiência pública — Release 1](15-public-experience-release-1.md)

Perguntas que esta trilha responde: qual token representa esta intenção? Quais estados precisam ser desenhados? Como validar contraste? O componente já existe? O que deve constar no handoff?

### Trilha Development

Para instalar, implementar, validar e publicar:

1. [README e quick start](../README.md#começar)
2. [Arquitetura e geração de tokens](01-architecture-tokens.md#implementação)
3. [Inventário e APIs planejadas](04-components.md)
4. [Pipeline Figma → Deploy](06-pipeline.md)
5. [Backend Supabase](07-supabase.md)
6. [Secrets](08-secrets.md)
7. [Distribuição e versionamento](18-distribution.md)
8. [Decisões arquiteturais](10-decisions.md)
9. [Contrato de contexto para agentes](14-ai-context-contract.md)
10. [Como contribuir](../CONTRIBUTING.md)

Perguntas que esta trilha responde: qual pacote importar? Onde o código deve viver? Como adicionar um componente? Quais gates precisam passar? Como publicar sem expor secrets?

## Referência completa

1. [Visão geral](00-overview.md)
2. [Arquitetura de tokens e dimensões](01-architecture-tokens.md)
3. [Escala de cores](02-color-scale.md)
4. [Acessibilidade (APCA)](03-accessibility-apca.md)
5. [Inventário de componentes](04-components.md)
6. [Multibrand · modes · themes](05-multibrand.md)
7. [Pipeline Figma → Deploy](06-pipeline.md)
8. [Backend Supabase](07-supabase.md)
9. [Secrets](08-secrets.md)
10. [Recursos do projeto](09-project-links.md)
11. [Decisões (ADR)](10-decisions.md)
12. [Roadmap](11-roadmap.md)
13. [Anatomia e Definition of Done](12-component-anatomy.md)
14. [Iconografia semântica](13-iconography.md)
15. [Contrato de contexto para IA](14-ai-context-contract.md)
16. [Experiência pública — Release 1](15-public-experience-release-1.md)
17. [Assets de marca e avatar](16-brand-assets.md)
18. [API e qualidade dos componentes](17-component-api-quality.md)
19. [Distribuição e versionamento](18-distribution.md)
20. [Sincronização design → código](19-design-code-sync.md)

Contribuição: [CONTRIBUTING](../CONTRIBUTING.md) · Histórico: [CHANGELOG](../CHANGELOG.md)
