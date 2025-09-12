terraform {
  backend "s3" {
    bucket         = "terraf-state-sq"
    key            = "terraform/infra.tfstate"
    region         = "ap-south-1"
    encrypt        = true
  }
}
