---
title: Methods
---

{{ .Description }}

{{- range .Types }}
  {{- range .Entries }}
## Method: {{ .Method }}
{{ .Text }}
  {{ end }}
{{ end }}
