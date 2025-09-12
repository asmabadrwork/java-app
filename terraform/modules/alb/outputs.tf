output "alb_dns" {
  description = "DNS name of the Application Load Balancer"
  value       = aws_lb.alb.dns_name
}

output "sq_target_group_arn" {
  description = "Target group ARN for SonarQube (9000)"
  value       = aws_lb_target_group.sq_tg.arn
}

