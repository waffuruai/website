---
name: install-waffuru
description: Install Waffuru's Iron (GPU kernels) or Butter (model serving) from the installer scripts published at waffuru.ai, and verify each script's SHA-256 checksum before running it. Use when a user asks to install, update or pin Iron or Butter.
---

# Install Iron or Butter from waffuru.ai

Waffuru publishes one verified installer per product at `https://waffuru.ai/<product>/install.sh`. Use this skill to install Iron or Butter, to inspect the script first, or to pin a version.

Waffuru's products are closed source and in early access. If an installer fails with a permission or sign-in error, the user may not have access yet. Send them to the early-access form at https://forms.gle/SHaVSRRWmZKy8UJy7 or to hello@waffuru.ai. Do not work around it.

## Products

| Product  | What it is                                                                                  | Installer                              |
| -------- | ------------------------------------------------------------------------------------------- | -------------------------------------- |
| `iron`   | GPU kernels: one kernel definition lowered to Metal, CUDA, HIP/ROCm or Vulkan               | `https://waffuru.ai/iron/install.sh`   |
| `butter` | Model serving with minimal dependencies, with an OpenAI-compatible `butter serve` and loading from Hugging Face | `https://waffuru.ai/butter/install.sh` |

Check fit before installing. Apple silicon (Metal) is the primary target. NVIDIA (CUDA) is secondary and in production on RTX and DGX Spark. AMD (ROCm) and Vulkan run, but are not tuned yet.

## Steps

1. Choose the product, `iron` or `butter`. If the user did not say which, ask.
2. Download the script and its checksum. Do not pipe the script into a shell yet.

   ```sh
   product=butter   # or iron
   base="https://waffuru.ai/$product"
   curl -fsSL "$base/install.sh" -o install.sh
   curl -fsSL "$base/install.sh.sha256" -o install.sh.sha256
   ```

3. Verify the checksum. The published `.sha256` is the checksum of the release asset. The served script has exactly one extra line after the shebang, starting `# waffuru release:`, which records the release it came from and how it was verified. Drop that line, then compare:

   ```sh
   expected=$(awk 'NR==1 {print $1}' install.sh.sha256)
   actual=$(grep -v '^# waffuru release:' install.sh | shasum -a 256 | awk '{print $1}')
   [ "$expected" = "$actual" ] && echo "checksum ok" || echo "CHECKSUM MISMATCH"
   ```

   `shasum -a 256` works on macOS and Linux. If the two differ, stop, do not run the script and tell the user.

4. Read the script, tell the user what it will do, and run it once they agree:

   ```sh
   sh install.sh
   ```

## Pin a version or find the latest

`https://waffuru.ai/<product>/releases.json` lists the published tags: the `latest` tag, and for each entry in `releases` its `tag`, `sha256` and `path`. A pinned copy and its checksum live at `https://waffuru.ai/<product>/<tag>/install.sh` and `https://waffuru.ai/<product>/<tag>/install.sh.sha256`. Verify a pinned script the same way as above.

```sh
curl -fsSL "https://waffuru.ai/butter/releases.json"
```

## Rules

- Never run an installer whose checksum does not match, and never edit a script to make it match.
- Use only the `https://waffuru.ai/<product>/` URLs above, not a mirror or a copy from somewhere else.
- Do not add `sudo`. If the script asks for elevated rights, tell the user what it asks for and let them decide.
- Everything on https://waffuru.ai is also available as markdown: send `Accept: text/markdown`, or read https://waffuru.ai/llms.txt for the index.
