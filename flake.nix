{
  inputs = { nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable"; };

  outputs = { nixpkgs, ... }:
    let
      systems =
        [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
    in {
      devShells = nixpkgs.lib.genAttrs systems (s:
        let pkgs = import nixpkgs { system = s; };
        in {
          default = pkgs.mkShell {
            name = "shell";
            packages = with pkgs; [ bun nodejs_20 ];
          };
        });
    };
}
