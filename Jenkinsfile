pipeline {
  agent any

  environment {
    ANSIBLE_CONFIG = "${WORKSPACE}/ansible/ansible.cfg"
    ANSIBLE_PYTHON_INTERPRETER = "/usr/bin/python3"
    PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" // Ensure pip-installed binaries are visible
  }

  stages {
    stage('Terraform Init & Apply') {
      steps {
        dir('terraform') {
          sh 'terraform init'
          sh 'terraform apply -auto-approve'
        }
      }
    }

    stage('Wait for EC2 Initialization') {
      steps {
        script {
          echo "Waiting 1 minutes for EC2 to fully initialize (cloud-init, SSH, networking)..."
          sleep(time: 1, unit: "MINUTES")
        }
      }
    }


    stage('Ansible Provisioning') {
      steps {
        dir('ansible') {
          script {
            try {
              sh 'ansible-playbook -i inventory_ssm.aws_ec2.yml playbook.yml -e ansible_python_interpreter=${ANSIBLE_PYTHON_INTERPRETER}'
            } catch (Exception e) {
              echo "Provisioning failed: ${e.getMessage()}"
              currentBuild.result = 'FAILURE'
            }
          }
        }
      }
    }
  }
}
