create index ds_context_embedding_idx on public.ds_context
  using hnsw (embedding extensions.vector_cosine_ops);
