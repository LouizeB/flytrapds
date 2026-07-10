import * as React from "react";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { AiAvatar, Alert, AlertDescription, AlertTitle, Button, CheckboxField, Input, Tabs, TabsContent, TabsList, TabsTrigger } from "../src";

describe.each(["light", "dark", "vibrant"])("matriz de aparência: %s", appearance => {
  it("mantém estrutura acessível nos componentes fundamentais", async () => {
    const { container } = render(<div className={appearance === "light" ? "" : appearance}>
      <Button>Ação principal</Button>
      <label htmlFor={`input-${appearance}`}>Nome</label>
      <Input id={`input-${appearance}`} />
      <CheckboxField label="Aceitar termos" />
      <Tabs defaultValue="one"><TabsList aria-label="Seções"><TabsTrigger value="one">Um</TabsTrigger><TabsTrigger value="two">Dois</TabsTrigger></TabsList><TabsContent value="one">Conteúdo</TabsContent><TabsContent value="two">Outro</TabsContent></Tabs>
      <Alert><AlertTitle>Informação</AlertTitle><AlertDescription>Mensagem persistente.</AlertDescription></Alert>
      <AiAvatar />
    </div>);
    expect((await axe(container, { rules: { "color-contrast": { enabled: false } } })).violations).toHaveLength(0);
  });
});
