provider "aws" {
  region = "eu-north-1"

  default_tags {
    tags = {
      Project     = "monoweb"
      Environment = terraform.workspace
    }
  }
}

provider "aws" {
  alias  = "us-east-1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project     = "monoweb"
      Environment = terraform.workspace
    }
  }
}

provider "vercel" {
  team = "dotkom"
}
