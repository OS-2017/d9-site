<?php

namespace Drupal\block_examples\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Contact Info' block.
 *
 * @Block(
 *   id = "block_examples_contact_info",
 *   admin_label = @Translation("Block Example: Contact Info"),
 *   category = @Translation("Examples")
 * )
 */
class ContactInfoBlock extends BlockBase {

  public function defaultConfiguration() {
    return [
      'phone' => '',
      'email' => ''
    ];
  }
  //create an array where each item has specs for form elements
  public function blockForm($form, \Drupal\Core\Form\FormStateInterface $form_state) {
    $form['phone'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Phone Number'),
      '#required' => TRUE,
      '#default_value' => $this->configuration['phone'],//save entered value in the form
    ];
    $form['email'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Email'),
      '#required' => TRUE,
      '#default_value' => $this->configuration['email'],//save entered email in the block form field
    ];
    return $form;
  }
//This method checks the form for errors  and if there are no errors, then it gets the value that the user put in the form - 'form_state->getValue'
  public function blockSubmit($form, \Drupal\Core\Form\FormStateInterface $form_state) {
    if (!$form_state->getErrors()) {
      $this->configuration['phone'] = $form_state->getValue('phone');
      $this->configuration['email'] = $form_state->getValue('email');
    }
    parent::blockSubmit($form, $form_state);
  }

  /**
  * {@inheritdoc}
  */
  public function build() {
    return [
      '#markup' => 
        '<div>' . $this->t('Phone Number: @phone', ['@phone' => $this->configuration['phone']]) . '</div>' .
        '<div>' . $this->t('Email: @email', ['@email' => $this->configuration['email']]) . '</div>',
    ];
  }

}