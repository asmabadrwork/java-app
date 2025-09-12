resource "aws_lb" "alb" {
  name               = "app-loadbalancer"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.sg_id]
  subnets            = var.public_subnets

  tags = {
    Name = "AppLoadBalancer"
  }
}

# Target Group for SQ (9000)
resource "aws_lb_target_group" "sq_tg" {
  name        = "sq-target-group"
  port        = 9000
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "instance"

  health_check {
    enabled             = true
    path                = "/"
    port                = "9000"
    protocol            = "HTTP"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200-399"
  }

  tags = {
    Name = "SonarQubeTargetGroup"
  }
}


# Listener for SQ (9000)
resource "aws_lb_listener" "sq_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 9000
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.sq_tg.arn
  }
}
