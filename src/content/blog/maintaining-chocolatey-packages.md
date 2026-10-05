---
title: "Notes on maintaining Chocolatey packages"
date: 2026-10-04
description: "Sample post — replace with your own content. Lessons from keeping Windows install packages up to date."
tags: ["powershell", "chocolatey", "packaging"]
draft: false
---

<div class="sample-notice">

**Sample post — replace with your own content.** Longer write-ups like this one also
live in `src/content/blog/` as Markdown files. Code blocks get syntax highlighting
automatically (this site uses Shiki with the `github-dark` theme).

</div>

I maintain a handful of Chocolatey packages (`rustup.install`, `berrybrew.install`,
`cursor.install` and a few others). Most of the maintenance work boils down to the
same checklist, so here it is.

## 1. Pin the version explicitly

Every package version must install exactly the upstream release it claims. Never
download "latest" at install time — Chocolatey moderation will reject it, and
reproducibility goes out the window.

## 2. Verify checksums in the install script

The install script should always validate the checksum of the downloaded file:

```powershell
$ErrorActionPreference = 'Stop'

$packageName = 'rustup.install'
$url64 = 'https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe'
$checksum64 = 'PUT_THE_SHA256_HERE'
$checksumType64 = 'sha256'

Install-ChocolateyPackage $packageName `
  -Url64bit $url64 `
  -Checksum64 $checksum64 `
  -ChecksumType64 $checksumType64 `
  -SilentArgs '-y'
```

Computing the checksum is a one-liner once you have the file:

```powershell
Get-FileHash .\rustup-init.exe -Algorithm SHA256 | Select-Object -ExpandProperty Hash
```

## 3. Keep the update cadence boring

Upstream releases a new version → bump the package version, update URL and checksum,
run `choco pack`, test in a clean VM, push. Automate the boring parts (au, the
Chocolatey Automatic Updater, can watch upstream URLs), but always eyeball the diff
before pushing — a compromised upstream download is not how you want to learn about
supply-chain security.

## 4. Test like a user would

`choco install <pkg> --force` on a machine that never had the tool, then uninstall
it cleanly. Leftover files and broken uninstalls are the most common complaints,
and they're entirely avoidable with five minutes of testing.
